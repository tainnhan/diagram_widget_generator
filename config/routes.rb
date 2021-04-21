DiagramWidgetGenerator::Engine.routes.draw do
  root 'charts#index'
  resources :charts
  get '/api/charts', to: 'api#charts'
  get '/api/chart/:id', to: 'api#get_single_chart'
  get '/widget/:id', to: 'charts#iframe'
  get '/*all', to: 'charts#index'
end
