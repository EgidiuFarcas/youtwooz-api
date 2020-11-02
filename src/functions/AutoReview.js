import SwearFilter from './SwearFilter.js';
import SubmissionModel from '../models/SubmissionModel.js';


export default class AutoReview {

    static async check(submissionID){
        if(!submissionID) return;
        let sub = await SubmissionModel.get(submissionID);
        if(!sub) return;
        
        let swearCheck = SwearFilter(sub.description);
        if(swearCheck !== null){
            await this.moveToManualReview(sub._id, 'Blacklisted word(s) in description.');
            return;
        }

        swearCheck = SwearFilter(sub.name);
        if(swearCheck !== null){
            await this.moveToManualReview(sub._id, 'Blacklisted word(s) in name.');
            return;
        }

        swearCheck = SwearFilter(sub.height);
        if(swearCheck !== null){
            await this.moveToManualReview(sub._id, 'Blacklisted word(s) in height.');
            return;
        }
        
        swearCheck = SwearFilter(sub.artist2D);
        if(swearCheck !== null){
            await this.moveToManualReview(sub._id, 'Blacklisted word(s) in artist 2D name.');
            return;
        }
        
        swearCheck = SwearFilter(sub.artist3D);
        if(swearCheck !== null){
            await this.moveToManualReview(sub._id, 'Blacklisted word(s) in artist 3D name.');
            return;
        }

        await this.moveToPublished(sub._id);
    }

    static async moveToManualReview(submissionID, reason){
        await SubmissionModel.setInfo(submissionID, {
            status: 'pending manual review',
            statusMessage: reason
        });
    }

    static async moveToPublished(submissionID){
        await SubmissionModel.setInfo(submissionID, {
            status: 'published',
            statusMessage: 'Ready to rumble'
        });
    }

}