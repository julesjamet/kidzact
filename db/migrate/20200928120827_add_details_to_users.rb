class AddDetailsToUsers < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :messenger_link, :string
    add_column :users, :phone_number, :string
    add_column :users, :job, :string
    add_column :users, :desc, :text
    add_column :users, :address, :string
  end
end
