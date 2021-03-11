require_dependency "diagram_widget_generator/application_controller"

module DiagramWidgetGenerator
  class ChartsController < ApplicationController
    protect_from_forgery except: :iframe
    def index
      @pathname = DiagramWidgetGenerator::Engine.routes.find_script_name({})
    end

    def new
      @pathname = DiagramWidgetGenerator::Engine.routes.find_script_name({})
      render 'diagram_widget_generator/charts/index'
    end

    def edit
      @pathname = DiagramWidgetGenerator::Engine.routes.find_script_name({})
      render 'diagram_widget_generator/charts/index'
    end

    def show
      @pathname = DiagramWidgetGenerator::Engine.routes.find_script_name({})
      render 'diagram_widget_generator/charts/index'
    end

    def create
      head :no_content
      Chart.create(payload: chart_params[:options])
    end

    def destroy
      head :no_content
      widget = Chart.find(params[:id])
      widget.destroy
    end

    def update
      head :no_content
      widget = Chart.find(params[:id])
      widget.update(payload: chart_params[:options])
    end

    def iframe
      @chart_id = params[:id]
      @pathname = DiagramWidgetGenerator::Engine.routes.find_script_name({})
      respond_to do |format|
        format.js {
          render layout: false
        }
      end
    end

    private

    def chart_params
      params.permit!
    end

  end
end
