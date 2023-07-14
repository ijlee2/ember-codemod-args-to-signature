#!/usr/bin/env sh

#----------
#
#  A. Purpose
#
#    Fix all test fixtures after updating the source code.
#
#  B. Usage
#
#    ./codemod-test-fixtures.sh
#
#---------

# Compile TypeScript
pnpm build

./codemod-test-fixture.sh \
  -N "--src app/components" \
  classic-components

./codemod-test-fixture.sh \
  -N "--src app/components" \
  ember-container-query

./codemod-test-fixture.sh \
  -N "--src addon/components" \
  ember-container-query-addon

./codemod-test-fixture.sh \
  -N "--src src/components" \
  ember-container-query-glint

./codemod-test-fixture.sh \
  -N "--component-structure nested --src app/components" \
  ember-container-query-nested

./codemod-test-fixture.sh \
  -N "--src app/components" \
  ember-container-query-no-args
