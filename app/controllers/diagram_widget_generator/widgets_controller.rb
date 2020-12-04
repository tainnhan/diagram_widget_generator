require_dependency "diagram_widget_generator/application_controller"

module DiagramWidgetGenerator
  class WidgetsController < ApplicationController
    def index
      @pathname = DiagramWidgetGenerator::Engine.routes.find_script_name({})
    end

    def show
    end

  end
end
