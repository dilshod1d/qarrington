import mongoose from 'mongoose';

const TrackSchema = new mongoose.Schema({
  trackVolumes: {
    trackNow: {
      trackValue: { type: String },
      trackChange: { type: String },
      trackDatedAt: { type: String }
    },
    trackMinute: {
      trackValue: { type: String },
      trackChange: { type: String },
      trackDatedAt: { type: String }
    },
    trackHour: {
      trackValue: { type: String },
      trackChange: { type: String },
      trackDatedAt: { type: String }
    },
    trackDay: {
      trackValue: { type: String },
      trackChange: { type: String },
      trackDatedAt: { type: String }
    },
    trackWeek: {
      trackValue: { type: String },
      trackChange: { type: String },
      trackDatedAt: { type: String }
    },
    trackMonth: {
      trackValue: { type: String },
      trackChange: { type: String },
      trackDatedAt: { type: String }
    },
    trackQuarter: {
      trackValue: { type: String },
      trackChange: { type: String },
      trackDatedAt: { type: String }
    },
    trackYear: {
      trackValue: { type: String },
      trackChange: { type: String },
      trackDatedAt: { type: String }
    }
  },
  trackAccounts: {
    trackNow: {
      trackValue: { type: String },
      trackChange: { type: String },
      trackDatedAt: { type: String }
    },
    trackMinute: {
      trackValue: { type: String },
      trackChange: { type: String },
      trackDatedAt: { type: String }
    },
    trackHour: {
      trackValue: { type: String },
      trackChange: { type: String },
      trackDatedAt: { type: String }
    },
    trackDay: {
      trackValue: { type: String },
      trackChange: { type: String },
      trackDatedAt: { type: String }
    },
    trackWeek: {
      trackValue: { type: String },
      trackChange: { type: String },
      trackDatedAt: { type: String }
    },
    trackMonth: {
      trackValue: { type: String },
      trackChange: { type: String },
      trackDatedAt: { type: String }
    },
    trackQuarter: {
      trackValue: { type: String },
      trackChange: { type: String },
      trackDatedAt: { type: String }
    },
    trackYear: {
      trackValue: { type: String },
      trackChange: { type: String },
      trackDatedAt: { type: String }
    }
  },
  trackCompanies: {
    trackNow: {
      trackValue: { type: String },
      trackChange: { type: String },
      trackDatedAt: { type: String }
    },
    trackMinute: {
      trackValue: { type: String },
      trackChange: { type: String },
      trackDatedAt: { type: String }
    },
    trackHour: {
      trackValue: { type: String },
      trackChange: { type: String },
      trackDatedAt: { type: String }
    },
    trackDay: {
      trackValue: { type: String },
      trackChange: { type: String },
      trackDatedAt: { type: String }
    },
    trackWeek: {
      trackValue: { type: String },
      trackChange: { type: String },
      trackDatedAt: { type: String }
    },
    trackMonth: {
      trackValue: { type: String },
      trackChange: { type: String },
      trackDatedAt: { type: String }
    },
    trackQuarter: {
      trackValue: { type: String },
      trackChange: { type: String },
      trackDatedAt: { type: String }
    },
    trackYear: {
      trackValue: { type: String },
      trackChange: { type: String },
      trackDatedAt: { type: String }
    }
  },
  trackCapitalizations: {
    trackNow: {
      trackValue: { type: String },
      trackChange: { type: String },
      trackDatedAt: { type: String }
    },
    trackMinute: {
      trackValue: { type: String },
      trackChange: { type: String },
      trackDatedAt: { type: String }
    },
    trackHour: {
      trackValue: { type: String },
      trackChange: { type: String },
      trackDatedAt: { type: String }
    },
    trackDay: {
      trackValue: { type: String },
      trackChange: { type: String },
      trackDatedAt: { type: String }
    },
    trackWeek: {
      trackValue: { type: String },
      trackChange: { type: String },
      trackDatedAt: { type: String }
    },
    trackMonth: {
      trackValue: { type: String },
      trackChange: { type: String },
      trackDatedAt: { type: String }
    },
    trackQuarter: {
      trackValue: { type: String },
      trackChange: { type: String },
      trackDatedAt: { type: String }
    },
    trackYear: {
      trackValue: { type: String },
      trackChange: { type: String },
      trackDatedAt: { type: String }
    }
  },
  trackCountries: {
    trackNow: {
      trackValue: { type: String },
      trackChange: { type: String },
      trackDatedAt: { type: String }
    },
    trackMinute: {
      trackValue: { type: String },
      trackChange: { type: String },
      trackDatedAt: { type: String }
    },
    trackHour: {
      trackValue: { type: String },
      trackChange: { type: String },
      trackDatedAt: { type: String }
    },
    trackDay: {
      trackValue: { type: String },
      trackChange: { type: String },
      trackDatedAt: { type: String }
    },
    trackWeek: {
      trackValue: { type: String },
      trackChange: { type: String },
      trackDatedAt: { type: String }
    },
    trackMonth: {
      trackValue: { type: String },
      trackChange: { type: String },
      trackDatedAt: { type: String }
    },
    trackQuarter: {
      trackValue: { type: String },
      trackChange: { type: String },
      trackDatedAt: { type: String }
    },
    trackYear: {
      trackValue: { type: String },
      trackChange: { type: String },
      trackDatedAt: { type: String }
    }
  }
});

export default mongoose.models.Track || mongoose.model('Track', TrackSchema);
