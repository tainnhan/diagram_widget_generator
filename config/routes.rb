DiagramWidgetGenerator::Engine.routes.draw do
  root 'widgets#index'
  post '/create' , to: 'api#create_chart'
  get '/charts', to: 'api#charts'
end
