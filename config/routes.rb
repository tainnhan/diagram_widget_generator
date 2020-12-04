DiagramWidgetGenerator::Engine.routes.draw do
  root 'widgets#index'
  post '/create' , to: 'api#create_chart'
  delete '/delete/:id', to: 'api#delete_chart'
  put '/edit/:id', to: 'api#edit_chart'
  get '/charts', to: 'api#charts'
  get '/*all', to: 'widgets#index'
end
