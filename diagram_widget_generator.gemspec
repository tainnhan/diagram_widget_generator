$:.push File.expand_path("lib", __dir__)

# Maintain your gem's version:
require "diagram_widget_generator/version"

# Describe your gem and declare its dependencies:
Gem::Specification.new do |spec|
  spec.name        = "diagram_widget_generator"
  spec.version     = DiagramWidgetGenerator::VERSION
  spec.authors     = [""]
  spec.email       = [""]
  spec.homepage    = "https://www.this-is-just-a-test.de"
  spec.summary     = "A Vue based Rails Engine to generate Diagrams"
  spec.description = "A Vue base Rails Engine for everyone who want to have a simple Diagram Generator and embedd as a Widget to your own Website."
  spec.license     = "MIT"

  # Prevent pushing this gem to RubyGems.org. To allow pushes either set the 'allowed_push_host'
  # to allow pushing to a single host or delete this section to allow pushing to any host.
  if spec.respond_to?(:metadata)
    spec.metadata["allowed_push_host"] = "TODO: Set to 'http://mygemserver.com'"
  else
    raise "RubyGems 2.0 or newer is required to protect against " \
      "public gem pushes."
  end

  spec.files = Dir["{app,config,db,lib}/**/*", "MIT-LICENSE", "Rakefile", "README.md"]

  spec.add_dependency "rails", "~> 6.0.3", ">= 6.0.3.4"

  spec.add_development_dependency "pg"
end
