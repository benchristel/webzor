#!/bin/sh

which npm > /dev/null || echo 'You must install npm first.'
which jasmine > /dev/null || npm i -g jasmine
which uglify > /dev/null || npm i -g uglify

SOURCE_FILES='src/core.js src/lib/*.js'

# construct the test file
cat $SOURCE_FILES src/spec/*.js > spec.js

# if the test pass, build the library
jasmine spec.js &&
  cat $SOURCE_FILES > webzor.js &&
  uglify -s webzor.js -o webzor.min.js > /dev/null
