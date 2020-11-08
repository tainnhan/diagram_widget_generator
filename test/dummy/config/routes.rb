Rails.application.routes.draw do
  mount DiagramWidgetGenerator::Engine => "/diagram_widget_generator"
end
