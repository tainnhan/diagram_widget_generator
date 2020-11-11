module DiagramWidgetGenerator
  class Engine < ::Rails::Engine
    isolate_namespace DiagramWidgetGenerator
    initializer "webpacker.proxy" do |app|
      insert_middleware = begin
                            DiagramWidgetGenerator.webpacker.config.dev_server.present?
                          rescue
                            nil
                          end
      next unless insert_middleware

      app.middleware.insert_before(
          0, Webpacker::DevServerProxy, # "Webpacker::DevServerProxy" if Rails version < 5
          ssl_verify_none: true,
          webpacker: DiagramWidgetGenerator.webpacker
      )
    end

    config.app_middleware.use(
        Rack::Static,
        urls: ["/diagram-widget-generator-packs"], root: DiagramWidgetGenerator::Engine.root.join("public")
    )
  end
end
