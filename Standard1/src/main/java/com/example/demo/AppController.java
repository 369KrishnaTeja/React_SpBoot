package com.example.demo;

import java.io.ByteArrayOutputStream;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.zip.GZIPOutputStream;
import org.springframework.mail.javamail.JavaMailSender;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

@Controller
@CrossOrigin("http://localhost:3000")
public class AppController {
	
	String user;
	String user1;
	
	@Autowired
	Repository r1;
	
	@Autowired
	Repository1 r2;
	
	@Autowired
	Repository2 r3;
	
	@Autowired
	Repository3 r4;
	
	@Autowired
	Repository4 r5;
	
	@Autowired
	private JavaMailSender mailSender;
	
	@ResponseBody
	@PostMapping("/reg")
	public String kkk(Model m,@ModelAttribute("j") User j)
	{
		r1.save(j);
		String from = "easyelectricityforeveryone@gmail.com";
		String to = j.getEmail();
        SimpleMailMessage msg = new SimpleMailMessage();
		msg.setFrom(from);
		msg.setTo(to);
		msg.setSubject("Registration Success to our website");
		msg.setText("Hello "+j.getUsername()+" Thank You for Registering to our website, we hope you get placed in no time.\nBest Wishes\nWebsite Name");
		mailSender.send(msg);
		return "Success";
	}
	
	@ResponseBody
	@PostMapping("/log")
	public String lll(Model m,@ModelAttribute("j") User j)
	{
		List<User> r=r1.findAll();
		for(int i=0;i<r.size();i++)
		{
			if(r.get(i).username.equals(j.username) && r.get(i).password.equals(j.password))
			{
				user=j.username;
				return "Hey "+j.username;
			}
		}
		return "Invalid";
	}
	
	@ResponseBody
	@PostMapping("/upload")
	public String ggg(MultipartFile file) throws IOException
	{
		Upload v=r2.findByUsername(user);
		if(v==null)
		{
		Upload u=new Upload();
		//System.out.println(username);
		u.setName(file.getOriginalFilename());
		u.setType(file.getContentType());
		u.setImageData(ImageUtils.compressImage(file.getBytes()));
		u.setUsername(user);
		r2.save(u);
		return "Upload Success";
		}
		v.setName(file.getOriginalFilename());
		v.setType(file.getContentType());
		v.setImageData(ImageUtils.compressImage(file.getBytes()));
		r2.save(v);
		return "Replaced Previous Resume";
	}
	
	@GetMapping("/getdata")
	public ResponseEntity<byte[]> abc() throws IOException
	{
		Upload u=r2.findByUsername(user);
		HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.IMAGE_JPEG);
        headers.setContentLength(u.getImageData().length);
        headers.setContentDispositionFormData("attachment", user + " resume.jpeg");
		byte[] x=ImageUtils.decompressImage(u.getImageData());
		return new ResponseEntity<>(x, headers, HttpStatus.OK);
	}
	
	@GetMapping("/getresumedata/{username}")
	public ResponseEntity<byte[]> abcw(@PathVariable String username) throws IOException
	{
		Upload u=r2.findByUsername(username);
		HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.IMAGE_JPEG);
        headers.setContentLength(u.getImageData().length);
        headers.setContentDispositionFormData("attachment", username + " resume.jpeg");
		byte[] x=ImageUtils.decompressImage(u.getImageData());
		return new ResponseEntity<>(x, headers, HttpStatus.OK);
	}
	
	@ResponseBody
	@GetMapping("/getcompany")
	public List<Job> abcd()
	{
		List<Appliedjobs> q=r5.getByUsername(user);
		List<Job> e=r4.findAll();
		List<Job> r=new ArrayList<Job>();
		for(int i=0;i<e.size();i++)
		{
			int y=-1;
			for(int j=0;j<q.size();j++)
			{
				if(q.get(j).getCompanyname().equals(e.get(i).getCompanyname())&&q.get(j).getJobdesc().equals(e.get(i).getJobdesc()))
				y=0;
			}
			if(y==-1)
				r.add(e.get(i));
		}
		return r;
	}
	
	@ResponseBody
	@GetMapping("/getcompanybyuser/{user2}")
	public List<Job> abcde(@PathVariable String user2)
	{
		Company r=r3.findByUsername(user2);
		return r4.findByCompanyname(r.getCompanyname());
	}
	
	@ResponseBody
	@GetMapping("/deletejob/{abc}/{user2}")
	public String abcdef(@PathVariable String abc,@PathVariable String user2)
	{
		List<Job> e=r4.findByJobdesc(abc);
		if(e.size()>0)
		{
			for(int j=0;j<e.size();j++)
			{
				Company f=r3.findByUsername(user2);
				if(e.get(j).getCompanyname().equals(f.getCompanyname()))
				{
					r4.delete(e.get(j));
					return "Job Role Deleted Successfully";
				}
			}
			return "No Job Found";
		}
		return "No Job Found";
	}
	
	@ResponseBody
	@PostMapping("/comreg")
	public String kkkk(Model m,@ModelAttribute("j") Company j)
	{
		r3.save(j);
		String from = "easyelectricityforeveryone@gmail.com";
		String to = j.getEmail();
        SimpleMailMessage msg = new SimpleMailMessage();
		msg.setFrom(from);
		msg.setTo(to);
		msg.setSubject("Registration Success to our website");
		msg.setText("Hello "+j.getUsername()+" Thank You for Registering to our website, Start uploading your job profiles and filter sutiable students to your job role.\nBest Wishes\nWebsite Name");
		mailSender.send(msg);
		return "Success";
	}
	
	@ResponseBody
	@GetMapping("/getbyuser/{user2}")
	public String getbyuser(@PathVariable String user2)
	{
		Company e=r3.findByUsername(user2);
		return e.companyname;
	}
	
	@ResponseBody
	@PostMapping("/job")
	public String job(Model m,@ModelAttribute("j") Job j)
	{
		r4.save(j);
		return "Success";
	}
	
	@ResponseBody
	@PostMapping("/comlog")
	public String llll(Model m,@ModelAttribute("j") Company j)
	{
		List<Company> r=r3.findAll();
		for(int i=0;i<r.size();i++)
		{
			if(r.get(i).username.equals(j.username) && r.get(i).password.equals(j.password))
			{
				user1=j.username;
				return "Hey "+j.username;
			}
		}
		return "Invalid";
	}
	
	@ResponseBody
	@PostMapping("/applyjob")
	public String apply(@ModelAttribute("k") Appliedjobs k)
	{
		k.setStatus("Pending");
		r5.save(k);
		return "Applied Successfully";
	}
	
	@ResponseBody
	@PostMapping("/removeapply")
	public String removeapply(@ModelAttribute("g") Appliedjobs g)
	{
		List<Appliedjobs> f=r5.getByUsername(g.getUsername());
		int u = 0;
		for(int i=0;i<f.size();i++)
		{
			if(f.get(i).getCompanyname().equals(g.getCompanyname())&&f.get(i).getJobdesc().equals(g.getJobdesc()))
			{
				u=f.get(i).getId();
				break;
			}
		}
		r5.deleteById(u);
		return "Removed Successfully";
	}
	
	@ResponseBody
	@GetMapping("/rejected/{jobdesc}/{username}/{user2}/{jobname}/{email}")
	public String remove(@PathVariable String jobdesc,@PathVariable String username,@PathVariable String user2,@PathVariable String jobname,@PathVariable String email)
	{
		Company e=r3.findByUsername(user2);
		List<Appliedjobs> k=r5.getByCompanyname(e.getCompanyname());
		for(int i=0;i<k.size();i++)
		{
			if(k.get(i).getJobdesc().equals(jobdesc)&&k.get(i).getUsername().equals(username))
			{
				if(k.get(i).getStatus().equals("Student Rejected"))
					k.get(i).setStatus("Students Rejected");
				else
				{
					k.get(i).setStatus("Rejected");
					String from = "easyelectricityforeveryone@gmail.com";
					String to = email;
			        SimpleMailMessage msg = new SimpleMailMessage();
					msg.setFrom(from);
					msg.setTo(to);
					msg.setSubject("Information Regarding Job Role Applied in "+user2+" Company");
					msg.setText("Sorry To Inform you the job role you applied "+jobname+" in "+e.getCompanyname()+" company has found your profile is not up to the mark. However, you can apply for other job profiles in our website");
					mailSender.send(msg);
				}
				r5.save(k.get(i));
				break;
			}
		}
		return "Rejected";
	}
	
	@ResponseBody
	@GetMapping("/offer/{jobdesc}/{username}/{user2}/{jobname}/{email}")
	public String offer(@PathVariable String jobdesc,@PathVariable String username,@PathVariable String user2,@PathVariable String jobname,@PathVariable String email)
	{
		Company e=r3.findByUsername(user2);
		List<Appliedjobs> k=r5.getByCompanyname(e.getCompanyname());
		for(int i=0;i<k.size();i++)
		{
			if(k.get(i).getJobdesc().equals(jobdesc)&&k.get(i).getUsername().equals(username))
			{
				k.get(i).setStatus("Offered");
				r5.save(k.get(i));
				String from = "easyelectricityforeveryone@gmail.com";
				String to = email;
		        SimpleMailMessage msg = new SimpleMailMessage();
				msg.setFrom(from);
				msg.setTo(to);
				msg.setSubject("Information Regarding Job Role Applied in "+user2+" Company");
				msg.setText("Congratulations!!! the job role you applied "+jobname+" in "+e.getCompanyname()+" company has offered you the job, please confirm your acceptance by tomorrow");
				mailSender.send(msg);
				break;
			}
		}
		return "Student Offered";
	}
	
	@ResponseBody
	@GetMapping("/accept/{jobdesc}/{username}/{companyname}")
	public String accept(@PathVariable String jobdesc,@PathVariable String username,@PathVariable String companyname)
	{
		List<Appliedjobs> k=r5.getByCompanyname(companyname);
		for(int i=0;i<k.size();i++)
		{
			if(k.get(i).getJobdesc().equals(jobdesc)&&k.get(i).getUsername().equals(username))
			{
				k.get(i).setStatus("Accepted");
				r5.save(k.get(i));
			}
		}
		return "Student Accepted";
	}
	
	@ResponseBody
	@GetMapping("/studentreject/{jobdesc}/{username}/{companyname}")
	public String stureject(@PathVariable String jobdesc,@PathVariable String username,@PathVariable String companyname)
	{
		List<Appliedjobs> k=r5.getByCompanyname(companyname);
		for(int i=0;i<k.size();i++)
		{
			if(k.get(i).getJobdesc().equals(jobdesc)&&k.get(i).getUsername().equals(username))
			{
				k.get(i).setStatus("Student Rejected");
				r5.save(k.get(i));
			}
		}
		return "Student Rejected";
	}
	
	@ResponseBody
	@GetMapping("/getapplyjob")
	public List<Appliedjobs> getapply()
	{
		List<Appliedjobs> k=r5.getByUsername(user);
//		List<Job> g = new ArrayList<Job>();
//		for(int i=0;i<k.size();i++)
//		{
//			List<Job> w=r4.findByCompanyname(k.get(i).getCompanyname());
//			for(int j=0;j<w.size();j++)
//			{
//				if(w.get(j).getJobdesc().equals(k.get(i).getJobdesc()))
//					g.add(w.get(j));
//			}
//		}
//		return g;
		return k;
	}
	
	@ResponseBody
	@GetMapping("/getstudents/{user2}")
	public List<Students> getstudents(@PathVariable String user2)
	{
		Company e=r3.findByUsername(user2);
		List<Appliedjobs> k=r5.getByCompanyname(e.getCompanyname());
		List<Students> g = new ArrayList<Students>();
		for(int i=0;i<k.size();i++)
		{
			Students d=new Students();
			List<Job> w=r4.findByJobdesc(k.get(i).getJobdesc());
			for(int j=0;j<w.size();j++)
			{
				if(w.get(j).getCompanyname().equals(e.getCompanyname()))
				{
					d.setJobname(w.get(j).getJobname());
					d.setJobdesc(w.get(j).getJobdesc());
					d.setUsername(k.get(i).getUsername());
					d.setStatus(k.get(i).getStatus());
				}
			}
			User h=r1.findByUsername(k.get(i).getUsername());
			d.setEmail(h.getEmail());
			d.setCollege(h.getCollege());
			d.setPhoneno(h.getPhoneno());
			g.add(d);
		}
		return g;
	}
	
	@ResponseBody
	@GetMapping("/getstatusstudents/{user2}/{status}")
	public List<Students> getstudents1(@PathVariable String user2,@PathVariable String status)
	{
		Company e=r3.findByUsername(user2);
		List<Appliedjobs> k=r5.getByCompanyname(e.getCompanyname());
		List<Students> g = new ArrayList<Students>();
		for(int i=0;i<k.size();i++)
		{
			if(k.get(i).getStatus().equals(status))
			{
			Students d=new Students();
			List<Job> w=r4.findByJobdesc(k.get(i).getJobdesc());
			for(int j=0;j<w.size();j++)
			{
				if(w.get(j).getCompanyname().equals(e.getCompanyname()))
				{
					d.setJobname(w.get(j).getJobname());
					d.setJobdesc(w.get(j).getJobdesc());
					d.setUsername(k.get(i).getUsername());
					d.setStatus(k.get(i).getStatus());
				}
			}
			User h=r1.findByUsername(k.get(i).getUsername());
			d.setEmail(h.getEmail());
			d.setCollege(h.getCollege());
			d.setPhoneno(h.getPhoneno());
			g.add(d);
			}
		}
		return g;
	}
	
	@ResponseBody
	@PostMapping("/sendmail/{jobname}/{jobdesc}/{maildata}/{user2}")
	public String sendmail(@PathVariable String jobname,@PathVariable String jobdesc,@PathVariable String maildata,@PathVariable String user2)
	{
		Company q=r3.findByUsername(user2);
		List<Appliedjobs> f=r5.getByCompanyname(q.getCompanyname());
		List<String> d = new ArrayList<String>();
		for(int i=0;i<f.size();i++)
		{
			if(f.get(i).getJobname().equals(jobname)&&f.get(i).getJobdesc().equals(jobdesc)&&f.get(i).getStatus().equals("Pending"))
			{
				User a=r1.findByUsername(f.get(i).getUsername());
				d.add(a.getEmail());
			}
		}
		for(int i=0;i<d.size();i++)
		{
			String email=d.get(i);
			String from = "easyelectricityforeveryone@gmail.com";
			String to = email;
	        SimpleMailMessage msg = new SimpleMailMessage();
			msg.setFrom(from);
			msg.setTo(to);
			msg.setSubject("Information Regarding Job Role Applied in "+user2+" Company");
			msg.setText(maildata);
			mailSender.send(msg);
		}
		return "Mails Sent Successfully";
	}
	
	@ResponseBody
	@GetMapping("/userprofile/{user2}")
	public User userprofile(@PathVariable String user2)
	{
		User e=r1.findByUsername(user2);
		return e;
	}
	
	@ResponseBody
	@GetMapping("/comprofile/{user2}")
	public Company comprofile(@PathVariable String user2)
	{
		Company e=r3.findByUsername(user2);
		return e;
	}
	
	@ResponseBody
	@PostMapping("/update/{user3}/{user4}/{college}/{email}/{phone}")
	public String update(@PathVariable String user3,@PathVariable String user4,@PathVariable String college,@PathVariable String email,@PathVariable String phone)
	{
		User t=r1.findByUsername(user3);
		t.setUsername(user4);
		t.setEmail(email);
		t.setPhoneno(phone);
		t.setCollege(college);
		r1.save(t);
		return "Success";
	}
	
	@ResponseBody
	@PostMapping("/update1/{user3}/{user4}/{email}/{companyname}")
	public String update1(@PathVariable String user3,@PathVariable String user4,@PathVariable String email,@PathVariable String companyname)
	{
		Company t=r3.findByUsername(user3);
		t.setUsername(user4);
		t.setEmail(email);
		t.setCompanyname(companyname);
		r3.save(t);
		return "Success";
	}
	
}
