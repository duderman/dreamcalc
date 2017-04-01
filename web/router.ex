defmodule Dreamcalc.Router do
  use Dreamcalc.Web, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", Dreamcalc do
    pipe_through :browser # Use the default browser stack

    get "/*path", PageController, :index
  end

  scope "/api", Dreamcalc do
    pipe_through :api

    post "/check_email", EmailController, :check
  end
end
