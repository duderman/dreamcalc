defmodule Dreamcalc.PageController do
  use Dreamcalc.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
