require "webpacker/helper"

module DiagramWidgetGenerator
  module ApplicationHelper
    include Webpacker::Helper

    def current_webpacker_instance
      DiagramWidgetGenerator.webpacker
    end

  end
end
