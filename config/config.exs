# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :dreamcalc,
  ecto_repos: [Dreamcalc.Repo]

# Configures the endpoint
config :dreamcalc, Dreamcalc.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "IJ9SFJdSIdgu/b/K+bh5bmXo4bX3l25LTSr4dG966O8xyMYvOOvV+huBZ4Aac23w",
  render_errors: [view: Dreamcalc.ErrorView, accepts: ~w(html json)],
  pubsub: [name: Dreamcalc.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
