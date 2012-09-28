class ExifyArray
  constructor: (buffer) ->
    @parameter = ///([CSLQXx\@])([0-9]{0,})///g
    @buffer = buffer || new Uint8Array()
    
  pack: (templateString = "") ->
    return false unless @parameter.test templateString
    
    @cursor = 0
    data = dir = tree = []
    
    tree = templateString.match @parameter
    dir = []
    for i = 0; i < tree.length; i++
      dir.push [tree[i], tree[i+1] || 0]
      i++
    
    data = []
    for i = 0; i < dir.length; i++
      data.push @[dir[i][0]](dir[i][1]) if @[dir[i][0]]
      
    console.dir(data)
    
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
    
window.ExifyArray = ExifyArray
