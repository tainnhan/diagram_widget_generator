DiagramWidgetGenerator::Engine.routes.draw do
  root 'widgets#index'
  post '/api/create' , to: 'api#create_chart'
  delete '/api/delete/:id', to: 'api#delete_chart'
  put '/api/edit/:id', to: 'api#edit_chart'
  get '/api/charts', to: 'api#charts'
  get '/api/chart/:id', to: 'api#get_single_chart'
  get '/chart/:id', to: 'widgets#show'
  get '/widget/:id', to: 'widgets#iframe'
  get '/*all', to: 'widgets#index'
end
