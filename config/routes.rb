DiagramWidgetGenerator::Engine.routes.draw do
  root 'widgets#index'
  post '/new/create' , to: 'api#create_chart'
  get '/charts', to: 'api#charts'
  get '/*all', to: 'widgets#index'
end
