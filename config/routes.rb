Rails.application.routes.draw do
  namespace :api, defaults: { format: :json } do
    post "signup", to: "registrations#create"
    post "login", to: "sessions#create"
    delete "logout", to: "sessions#destroy"
    resources :sessions, only: [ :index, :show, :destroy ]
    resource  :password, only: [ :edit, :update ]
    namespace :identity do
      resource :email,              only: [ :edit, :update ]
      resource :email_verification, only: [ :show, :create ]
      resource :password_reset,     only: [ :new, :edit, :create, :update ]
    end
    get "me", to: "current_users#show"
    resources :tasks, except: [ :show ]
    get "summary", to: "tasks#summary"
  end
  get "*path", to: "application#fallback_index_html", constraints: ->(request) do
    !request.xhr? && request.format.html?
  end
end
