class CreateKids < ActiveRecord::Migration[6.0]
  def change
    create_table :kids do |t|
      t.string :name
      t.integer :age
      t.string :school
      t.text :languages, array: true, default: []
      t.text :desc
      t.text :sports, array: true, default: []
      t.text :places, array: true, default: []
      t.text :interests, array: true, default: []

      t.timestamps
    end
  end
end
