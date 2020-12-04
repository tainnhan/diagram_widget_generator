require_dependency "diagram_widget_generator/application_controller"
module DiagramWidgetGenerator
  class ApiController < ApplicationController

    def create_chart
      head :no_content
      widget = Widget.create
      widget.add_json_file(widget_params[:options])
    end

    def delete_chart
      head :no_content
      widget = Widget.find(params[:id])
      widget.destroy
    end

    def edit_chart
      head :no_content
      widget = Widget.find(params[:id])
      widget.high_chart.purge
      widget.add_json_file(widget_params[:options])
    end

    def charts
      charts = Widget.all
      array = []
      charts.each do |chart|
        options = {
            id: chart.id,
            data: JSON.parse(chart.high_chart.download)
        }
        array.push(options)
      end

      respond_to do |format|
        format.json {  render json: array.to_json }
      end
    end

    def export_chart_to_json

    end

    private

    def widget_params
      params.permit!
    end

  end
end
