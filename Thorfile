require "execjs"
require "json"
require "open-uri"
require "tempfile"
require "watchr"

class Exify < Thor
  default_task :build
  
  desc "build", "Builds package into a single file."
  method_option :output, { :desc => "FILE to output to", :required => false, :default => "build.js", :alias => "-o", :type => :string, :banner => "FILE", :hide => false }
  method_option :raw, { :desc => "Write only preprocessed data", :required => false, :default => false, :alias => "-r", :type => :boolean, :banner => "", :hide => false }
  def build
    say "Building.", :YELLOW, :BOLD
    
    say "Concatenating.", :BLUE, :BOLD
    preprocessed = invoke :concat
    
    say "Processing.", :BLUE, :BOLD
    processed = invoke :process, [preprocessed]
    
    options[:output] += ".coffee" if options[:ra]
    
    File.open(options[:output], "w+") {
      |f|
      
      say "Writing to #{options[:output]}.", :YELLOW, :BOLD
      
      if options[:raw]
        f.write(preprocessed)
      else
        f.write(processed)
      end
    }
    
    say "Built.", :GREEN, :BOLD
    invoke :process
  end
  
  desc "concat", "Concatenates package into a single file."
  def concat
    package = IO.read 'lib/package.json'
    diagram = JSON.parse package
    
    paths = []
    diagram['directories'].each do |k,v|
      paths.push File.join('lib', v)
    end
    
    imported = []
    output = ""
    diagram['build'].each do |k,v|
      diagram['build'][k]['files'].each do |f|
        built = ""
        paths.each do |path|
          building = ""
          Dir[File.join(path, f)].reject{ |p| imported.include? p }.each do |found|
            imported.push(found)
            building << IO.read(found)
          end
          built << building
        end
        
       output << built 
      end
    end
    
    output
  end
  
  desc "process STRING", "CoffeeScript processing."
  def process(preprocessed)
    Dir.mkdir("tmp") if Dir["tmp"].empty?
    
    cache = Dir["tmp/coffee-script.*"].sort_by { |f| File.stat(f).ctime }
    cache ||= []
    
    if cache.empty? || Time.now > File.stat(cache.first).ctime + (60 * 60 * 24 * 7)
      cached = File.open(File.join(".", "tmp", "coffee-script.#{Time.now.to_i}"), "a+") {
        |f|
        
        f.write open("http://jashkenas.github.com/coffee-script/extras/coffee-script.js").read
      }
      
      cached.read
      compiler = cached.read
      cached.close
    else
      compiler = File.open(cache.first, "r") { |f| f.read }
    end

    instance = ExecJS.compile(compiler)
    instance.call("CoffeeScript.compile", preprocessed)
  end
  
  desc "watch", "Watch and build changes automatically."
  def watch
    say "Watching for changes.", :GREEN
    script = Watchr::Script.new
    script.watch("lib/exify-.*/.*\.coffee") {
      |f|
      say "Changed! Building...", :GREEN
      system 'thor exify:build'
    }
    
    handler = Watchr.handler.new;
    controller = Watchr::Controller.new(script,handler);
    controller.run # does block!
  end
end