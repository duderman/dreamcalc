defmodule Dreamcalc.EmailController do
  use Dreamcalc.Web, :controller

  plug :scrub_params, "email" when action in [:check]

  def check(conn, %{"email" => email}) do
    case EmailChecker.valid?(email) do
      true ->
        conn |> send_resp(200, '')
      false ->
        conn |> send_resp(400, '')
    end
  end
  def check(conn, _) do
    conn |> send_resp(400, '')
  end
end
