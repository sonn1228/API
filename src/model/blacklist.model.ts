import mongoose, { Schema, Document } from "mongoose";

interface IBlacklist extends Document {
  token: string;
  expiresAt: Date;
}

const BlacklistSchema: Schema = new Schema(
  {
    token: { type: String, required: true, unique: true },
    expiresAt: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);

BlacklistSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const Blacklist = mongoose.model<IBlacklist>("Blacklist", BlacklistSchema);

export default Blacklist;
