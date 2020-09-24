class CreateKids < ActiveRecord::Migration[6.0]
  def change
    create_table :kids do |t|
      t.string :name
      t.integer :age
      t.string :school
      t.text :languages
      t.text :desc
      t.text :sports
      t.text :places
      t.text :interests

      t.timestamps
    end
  end
end
