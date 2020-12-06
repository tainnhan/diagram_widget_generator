class CreateDiagramWidgetGeneratorWidgets < ActiveRecord::Migration[6.0]
  def change
    create_table :diagram_widget_generator_widgets do |t|
      t.boolean :import_json
      t.timestamps
    end
  end
end
