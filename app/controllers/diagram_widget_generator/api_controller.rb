 require_dependency "diagram_widget_generator/application_controller"
module DiagramWidgetGenerator
  class ApiController < ApplicationController

    def charts
      charts = Chart.all
      respond_to do |format|
        format.json {  render json: charts.to_json }
      end
    end

    def chart
      chart = Chart.find(params[:id])
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
