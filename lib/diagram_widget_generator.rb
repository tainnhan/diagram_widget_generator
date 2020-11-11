require "diagram_widget_generator/engine"

module DiagramWidgetGenerator
  # Your code goes here...
  class << self
    def webpacker
      @webpacker ||= ::Webpacker::Instance.new(
          root_path: DiagramWidgetGenerator::Engine.root,
          config_path: DiagramWidgetGenerator::Engine.root.join('config', 'webpacker.yml')
      )
    end
  end
end
