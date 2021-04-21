 require_dependency "diagram_widget_generator/application_controller"
module DiagramWidgetGenerator
  class ApiController < ApplicationController

    def create_chart
      head :no_content
      Chart.create(payload: widget_params[:options], import_json: widget_params[:fromImport])
    end

    def delete_chart
      head :no_content
      chart = Chart.find(params[:id])
      chart.destroy
    end

    def edit_chart
      head :no_content
      chart = Chart.find(params[:id])
      chart.update(payload: widget_params[:options])
    end

    def charts
      charts = Chart.all
      array = []
      charts.each do |chart|
        options = {
            id: chart.id,
            data: chart.payload
        }
        array.push(options)
      end

      respond_to do |format|
        format.json {  render json: array.to_json }
      end
    end

    def get_single_chart
      widget = Chart.find(params[:id])
      chart = {
          id: widget.id,
          data: widget.payload
      }
      respond_to do |format|
        format.json { render json: chart.to_json }
      end

    end

    private

    def widget_params
      params.permit!
    end

  end
end
