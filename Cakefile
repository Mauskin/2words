fs = require 'fs'

{exec} = require 'child_process'

option '-o', '--output [DIR]', 'output dir'

run = (command, callback) ->
  exec command, (err, stdout, stderr) ->
    console.warn stderr if stderr
    callback?() unless err

build = (callback) ->
  run 'coffee -co . src/*.coffee', ->
    run 'coffee -co spec src/spec/*-spec.coffee', callback

task 'build', 'Build main code and spec', ->
  build()

task 'test', 'Do jasmine tests', ->
  exec 'jasmine', (err, sout, serr) ->
    console.log err if err
    console.log sout if sout
    console.log serr if serr

task 'watch:test', 'watch and run tests', ->
  console.log 'watching...'

  whenChanged = (filename, callback)->
    fs.watch filename, ->
      callback()

  whenChanged "2words.js", ->
    console.log "===== TEST #{new Date().toLocaleString()} ====="
    invoke 'test'

task 'watch:build', 'watch build', ->
  console.log 'watching...'
  whenChanged = (filename, callback)->
    fs.watch filename, ->
      callback()
  whenChanged "src/2words.coffee", ->
    console.log "new build #{new Date().toLocaleString()}"
    invoke 'build'
