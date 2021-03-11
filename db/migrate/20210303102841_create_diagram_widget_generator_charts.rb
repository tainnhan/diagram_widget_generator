class CreateDiagramWidgetGeneratorCharts < ActiveRecord::Migration[6.0]
  def change
    create_table :diagram_widget_generator_charts do |t|
      t.jsonb :payload
      t.timestamps
    end
  end
end
