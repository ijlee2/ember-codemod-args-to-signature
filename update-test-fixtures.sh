#!/usr/bin/env sh

#----------
#
#  A. Purpose
#
#    Fix all test fixtures after updating the source code.
#
#  B. Usage
#
#    ./update-test-fixtures.sh
#
#---------

# Compile TypeScript
pnpm build

# Update fixtures
rm -r "tests/fixtures/classic-components/output"
cp -r "tests/fixtures/classic-components/input" "tests/fixtures/classic-components/output"

./dist/bin/ember-codemod-args-to-signature.js \
  --root "tests/fixtures/classic-components/output" \
  --type "app"

# Update fixtures
rm -r "tests/fixtures/ember-container-query/output"
cp -r "tests/fixtures/ember-container-query/input" "tests/fixtures/ember-container-query/output"

./dist/bin/ember-codemod-args-to-signature.js \
  --root "tests/fixtures/ember-container-query/output" \
  --type "app"

# Update fixtures
rm -r "tests/fixtures/ember-container-query-addon/output"
cp -r "tests/fixtures/ember-container-query-addon/input" "tests/fixtures/ember-container-query-addon/output"

./dist/bin/ember-codemod-args-to-signature.js \
  --root "tests/fixtures/ember-container-query-addon/output" \
  --type "v1-addon"

# Update fixtures
rm -r "tests/fixtures/ember-container-query-glint/output"
cp -r "tests/fixtures/ember-container-query-glint/input" "tests/fixtures/ember-container-query-glint/output"

./dist/bin/ember-codemod-args-to-signature.js \
  --root "tests/fixtures/ember-container-query-glint/output" \
  --type "v2-addon"

# Update fixtures
rm -r "tests/fixtures/ember-container-query-nested/output"
cp -r "tests/fixtures/ember-container-query-nested/input" "tests/fixtures/ember-container-query-nested/output"

./dist/bin/ember-codemod-args-to-signature.js \
  --component-structure nested \
  --root "tests/fixtures/ember-container-query-nested/output" \
  --type "app"

# Update fixtures
rm -r "tests/fixtures/ember-container-query-no-args/output"
cp -r "tests/fixtures/ember-container-query-no-args/input" "tests/fixtures/ember-container-query-no-args/output"

./dist/bin/ember-codemod-args-to-signature.js \
  --root "tests/fixtures/ember-container-query-no-args/output" \
  --type "app"
