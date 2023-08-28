Rails.application.config.middleware.insert_before 0, Rack::Cors do
    allow do
        #origins "*" to make the API public, to anyone.
        origins "http://localhost:3001"

        resources "*",
            headers: :any,
            methods: [:get, :post, :put, :patch, :delete, :options, :head]
    end
end