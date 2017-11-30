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
import java.util.Random;
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
import facades.RatingFacade;
import java.util.List;
import javax.persistence.EntityManagerFactory;
import javax.ws.rs.PUT;
import javax.ws.rs.PathParam;
import net.minidev.json.JSONObject;
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
  public String getRating(String ratingJson, @PathParam("id") Long id){
      Rating r = null;
      try{
          r = (Rating) irf.getSingleRating(id);
          if(r == null){
              return gson.toJson(r);
          }
      }catch(Exception ex){
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
}
