MOCHA = mocha
.PHONY: test

test:
	$(MOCHA) test

test-coverage:
	$(MOCHA) -R html-cov test > coverage.html

