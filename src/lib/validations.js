import { check, validationResult } from 'express-validator'

export const validate = async (validations, req, res) => {
      await Promise.all(validations.map((validation) => validation.run(req)))
      const errors = validationResult(req)
      if (errors.isEmpty()) return
      const err = []
      errors.array().map(error => err.push(error.msg))

      if (err.length > 0) return res.status(400).json({ success: false, message: errors })
}

export { check }