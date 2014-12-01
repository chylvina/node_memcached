TESTS = $(shell ls -S `find tests -type f -name "*.test.js" -print`)
REPORTER = spec
TIMEOUT = 15000
MOCHA_OPTS =

install:
	@tnpm install

jshint: install
	@./node_modules/.bin/jshint ./

test: install
	@NODE_ENV=test ./node_modules/.bin/mocha \
		--reporter $(REPORTER) \
		--timeout $(TIMEOUT) \
		--require should \
		$(MOCHA_OPTS) \
		$(TESTS)

test-cov cov: install
	@NODE_ENV=test node --harmony \
		node_modules/.bin/istanbul cover ./node_modules/.bin/_mocha \
		-- -u exports \
		--reporter $(REPORTER) \
		--timeout $(TIMEOUT) \
		--require should \
		$(MOCHA_OPTS) \
		$(TESTS)

.PHONY: test
