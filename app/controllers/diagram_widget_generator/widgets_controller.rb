require_dependency "diagram_widget_generator/application_controller"
require "webpacker/helper"
module DiagramWidgetGenerator
  class WidgetsController < ApplicationController
    protect_from_forgery except: :iframe
    def index
      @pathname = DiagramWidgetGenerator::Engine.routes.find_script_name({})
    end

    def show
      @widget_id = params[:id]
      @pathname = DiagramWidgetGenerator::Engine.routes.find_script_name({})
    end

    def iframe
      @widget_id = params[:id]
      @pathname = DiagramWidgetGenerator::Engine.routes.find_script_name({})
      respond_to do |format|
        format.js {
          render layout: false
        }
      end
    end
  end
end
