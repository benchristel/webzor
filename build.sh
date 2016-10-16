#!/bin/sh

which jasmine > /dev/null || echo 'jasmine must be installed first: try `npm i -g jasmine`'

SOURCE_FILES='src/core.js src/lib/*.js'

# construct the test file
cat $SOURCE_FILES src/spec/*.js > spec.js

# if the test pass, build the library
jasmine spec.js && cat $SOURCE_FILES > webzor.js
