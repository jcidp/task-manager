class CreateTasks < ActiveRecord::Migration[8.0]
  def change
    create_table :tasks do |t|
      t.string :title, null: false
      t.text :description
      t.date :due_date
      t.boolean :urgent, null: false, default: false
      t.boolean :important, null: false, default: false
      t.boolean :done, null: false, default: false
      t.belongs_to :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
