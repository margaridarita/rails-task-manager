class Task < ApplicationRecord
  validates :title, presence: true, length: { maximum: 20, message: "cannot be longer than 20 characters" }
end
