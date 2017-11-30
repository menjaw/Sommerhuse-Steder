/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package rest;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import entity.Place;
import entity.Rating;
import facades.IplaceFacade;
import facades.IratingFacade;
import facades.UserFacade;
import javax.persistence.Persistence;
import javax.ws.rs.Consumes;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.Path;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import facades.PlaceFacade;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import javax.persistence.EntityManagerFactory;
import javax.ws.rs.DefaultValue;
import javax.ws.rs.PUT;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.Response;
import net.minidev.json.JSONObject;
import org.glassfish.jersey.media.multipart.FormDataContentDisposition;
import org.glassfish.jersey.media.multipart.FormDataParam;
import security.IUserFacade;

/**
 * REST Web Service
 *
 * @author plaul1
 */
@Path("places")
public class All {

   
    
  @Context
  private UriInfo context;
  
  IUserFacade uf;
  Gson gson = new Gson();
  EntityManagerFactory emf;
  IplaceFacade ipf;
  IratingFacade irf;
  PlaceFacade pf;
  
  /**
   * Creates a new instance of A
   */
  public All() {
      
       uf = new UserFacade(Persistence.createEntityManagerFactory("pu_development"));       
  }
  
  
  /**
   * Retrieves representation of an instance of rest.All
   * @return an instance of java.lang.String
   */
  
  
  @POST
  @Path("regUser")
  @Consumes(MediaType.APPLICATION_JSON)
  @Produces(MediaType.APPLICATION_JSON)
  public String registerUser(String jsonString){
      JsonObject json = new JsonParser().parse(jsonString).getAsJsonObject();
      String username = json.get("username").getAsString();
      String password = json.get("password").getAsString();
      String regRes = uf.regUser(username, password);
      System.out.println(regRes);
      JSONObject jsonRet = new JSONObject();
      jsonRet.put("message", regRes);
      return jsonRet.toString();     
  }
  
  @POST
  @Path("createPlace")
  @Consumes(MediaType.APPLICATION_JSON)
  @Produces(MediaType.APPLICATION_JSON)
  public void createPlace(String json){
      entity.Place p = new Gson().fromJson(json,entity.Place.class);
      EntityManagerFactory emf = Persistence.createEntityManagerFactory("pu_development");
      PlaceFacade pFacade = new PlaceFacade(emf);
      pFacade.createPlace(p);
  }
  
  
  @GET
  @Path("rating/{id}")
  @Produces(MediaType.APPLICATION_JSON)
  public String getRating(String ratingJson, @PathParam("id") int id){
      Rating r = null;
        try{
            r = irf.getSingleRating(id);
            if(r == null){
                return gson.toJson(r);
            }
        }catch(NullPointerException ex){
            return null;
        }
        return gson.toJson(r);
  }
  
  
  
  @GET
  @Path("getPlaces")
  @Produces(MediaType.APPLICATION_JSON)
  public String getPlaces(){
     EntityManagerFactory emf = Persistence.createEntityManagerFactory("pu_development");
     ipf = new PlaceFacade(emf);
     return gson.toJson(ipf.getPlaces());
  }
  
  @GET
    @Path("single/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public String singlePlace(String singleJson, @PathParam("id") Long id){
        Place p = null;
        try{
            p = ipf.getPlace(id);
            if(p == null){
                return gson.toJson(p);
            }
        }catch(NullPointerException ex){
            return null;
        }
        return gson.toJson(p);
    }
    
    
    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public String putPlace(String content){
        
        JsonObject body = new JsonParser().parse(content).getAsJsonObject();
        
        Place p = ipf.getPlace(body.get("id").getAsLong());
        
        if(body.has("street")){
            p.setStreet(body.get("street").getAsString());
        }
        if(body.has("longitude")){
            p.setLongitude(body.get("longitude").getAsString());
            p.setLongitude(content);
        }
        if(body.has("latitude")){
            p.setLatitude(body.get("latitude").getAsString());
        }       

        pf.editPlace(p);
        
        return new Gson().toJson(p);
    }
    
    
  
  
  @POST
  @Path("setrating")
  @Consumes(MediaType.APPLICATION_JSON)
  @Produces(MediaType.APPLICATION_JSON)
  public String setRating(String jsonRating){
      return "{\"message\" : \"Logged in and rating is set\"}";
  }
  
  
  
  public static final String FILE_LOCATION = "/Users/danni/Desktop/";
  @Path("/file")
    @POST
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    public Response uploadFile(@DefaultValue("") @FormDataParam("user") String user,
            @FormDataParam("file") InputStream file,
            @FormDataParam("file") FormDataContentDisposition fileDisposition) throws IOException {

        System.out.println("Just to show how to send additonal data: " + user);
        String fileName = fileDisposition.getFileName();
        saveFile(file, fileName);
        String status = "{\"status\":\"uploaded\"}";
        return Response.ok(status).build();
    }

    private void saveFile(InputStream is, String fileLocation) throws IOException {
        String location = FILE_LOCATION + fileLocation;
        try (OutputStream os = new FileOutputStream(new File(location))) {
            byte[] buffer = new byte[256];
            int bytes = 0;
            while ((bytes = is.read(buffer)) != -1) {
                os.write(buffer, 0, bytes);
            }
        }
    }

}
