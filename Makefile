#############################################################################
# Makefile for MicroField CLI test
#
# Use "mocha" test framework for node.js
# Plase install "mocha" like a folloing:
#
# > sudo npm install -g mocha
#
# or change path to your installed mocha.
#
# Kazuhiro Kotsutsumi <kotsutsumi@xenophy.com>
#############################################################################

# Current Dir
CURRENT_DIR=$(shell pwd)

# mocha path
MOCHA = mocha

# Specs Dir
SPEC_DIR = $(CURRENT_DIR)/test/specs

# Specs
SPECS = $(shell find test/specs -type f -name '*.js')

test:
	sudo rm -Rf ~/UserDir/micro-field-cli-test-setup;
	sudo rm -Rf ~/UserDir/micro-field-cli-test-generate;
	sudo rm -Rf ~/UserDir/micro-field-cli-test-append-remove;
	$(MOCHA) $(SPECS)

test-tap:
#	sudo rm -Rf ~/UserDir/micro-field-cli-test-setup;
#	sudo rm -Rf ~/UserDir/micro-field-cli-test-generate;
#	sudo rm -Rf ~/UserDir/micro-field-cli-test-append-remove;
	$(MOCHA) --reporter tap $(SPECS)

.PHONY: test test-coverage

# eof
