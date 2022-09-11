import express from 'express';
import IdCounter from '../modals/idCounter.js';
import Student from '../modals/student.js';

const router = express.Router();

router.post('/register',async (req,res)=>{
    try{
        let date = new Date();
        date = date.toLocaleString('en-gb',{timeZone:'UTC'});

        const counter = await IdCounter.findByIdAndUpdate('entityId',{$inc:{count:1}},{upsert:true,new:true});
        const newData = Student({...req.body,_id:counter.count,submitDate:date});
        const data = await newData.save();
        return res.status(201).send(data);

    }
    catch(e){
        res.status(300).send('not work')
        console.log(e);
    }
});

router.get('/',async (req,res)=>{
    try{
        const data = await Student.find({});
        return res.status(200).send(data);
    }
    catch(e){
        res.status(300).send('not work')
        console.log(e);
    }
});

router.delete('/:id',async(req,res)=>{
    try{
        const id = req.params.id;
        const data = await Student.findByIdAndDelete(id);
        return res.status(200).send(data);
    }
    catch(e){
        res.status(300).send('not deleted');
    }
});

router.get('/search/:id',async (req,res)=>{
    try{
        const id = req.params.id;
        const data = await Student.find({_id:id});
        return res.status(200).send(data);
    }
    catch(e){
        console.log('something went wrong');
    }
});

router.patch('/:id',async(req,res)=>{
    try{
        const id = req.params.id;
        const data = await Student.findByIdAndUpdate(id,req.body,{new:true});
        return res.status(200).send(data);
    }
    catch(e){
        res.status(300).send('something went wrong');
    }
});

export default router;