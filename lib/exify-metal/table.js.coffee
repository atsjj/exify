class Table extends Exify
  constructor: (@table) ->
    
  lookup: (key) ->
    unless @table[key]
      @table[key]
    
    console.log("No such record, " + key) if super.debug
    
