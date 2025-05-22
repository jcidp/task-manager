class Task < ApplicationRecord
  belongs_to :user

  validates :title, presence: true

  scope :summary, -> { where(due_date: nil).or(where(due_date: ..Date.current)) }

  def as_json(options = {})
    super({ except: [ :user_id, :created_at, :updated_at ] }.merge(options))
  end
end
