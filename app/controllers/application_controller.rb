class ApplicationController < ActionController::API
    include ActionController::Cookies

    before_action :authorize

    rescue_from ActiveRecord::RecordNotFound, with: :rescue_from_record_not_found
    rescue_from ActiveRecord::RecordInvalid, with: :rescue_from_invalid_record
  
    private
  
    def rescue_from_invalid_record(exception)
      render json: { errors: exception.record.errors.full_messages }, status: :unprocessable_entity
    end
  
    def rescue_from_record_not_found(exception)
      render json: { errors: "#{exception.model} not found" }, status: :not_found
    end
  
    def authorize
      render json: { error: "Not authorized" }, status: :unauthorized unless session.include? :user_id
    end
end
