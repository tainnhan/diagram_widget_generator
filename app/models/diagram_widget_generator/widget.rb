module DiagramWidgetGenerator
  class Widget < ApplicationRecord
    has_one_attached :high_chart

    def add_json_file(chart_options)
      file = Tempfile.new([SecureRandom.uuid, '.json'])
      file.write(chart_options.to_json)
      file.rewind
      puts chart_options.to_json
      high_chart.attach(io: file, filename:  'data.json', content_type: 'application/json' )
      file.close
    end

  end
end
