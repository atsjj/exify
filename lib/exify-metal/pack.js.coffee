class Pack
  @buffer = null
  @cursor = null
  @parameter = ///([A-Za-z\@])([0-9]{0,})///g
  
  constructor: (@buffer = new ArrayBuffer())->
    
  pack: (templateString) =>
    @cursor = 0
    data = dir = tree = []
    
    tree = templateString.match @parameter
    
    dir = for branch of tree
      node for node of branch.match @parameter
    
    data = for template, length in dir
      @[template](length) if @[template]?
    
    data
    
  # Integer Directives
  "C": () => # 8-bit, char
    cursor = @cursor
    @cursor++
    
    @buffer[cursor]
    
  "S": () => # 16-bit, short, big-endian for now
    cursor = @cursor
    @cursor++
    
    short = (@buffer[cursor] << 8) + @buffer[cursor++]
    short += 65536 if int < 0
    
    short
    
  "L": () => # 32-bit, long
  "Q": () => # 64-bit, big
  
  # Misc. Directives  
  "@": (@cursor = 0) =>
  "X": (cursor = 1) =>
    @cursor += cursor
  "x": (cursor = 1) =>
    @cursor -= cursor
