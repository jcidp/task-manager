Rails.application.routes.draw do
  namespace :api, defaults: { format: :json } do
    post "sign_in", to: "sessions#create"
    post "sign_up", to: "registrations#create"
    resources :sessions, only: [ :index, :show, :destroy ]
    resource  :password, only: [ :edit, :update ]
    namespace :identity do
      resource :email,              only: [ :edit, :update ]
      resource :email_verification, only: [ :show, :create ]
      resource :password_reset,     only: [ :new, :edit, :create, :update ]
    end
  end
  get "*path", to: "application#fallback_index_html", constraints: ->(request) do
    !request.xhr? && request.format.html?
  end
end
